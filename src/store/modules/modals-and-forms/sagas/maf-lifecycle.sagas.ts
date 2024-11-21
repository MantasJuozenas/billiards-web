import { fork, join, race, take, takeEvery } from 'redux-saga/effects';

interface IActionWithPayload {
  type: string;
  payload: G.TMAFState<Record<string, never>>;
}

function* mafLifecycleSaga(initAction: IActionWithPayload) {
  let skipCleanup = false;
  try {
    yield initAction?.payload?.onPrepare?.();
    // @ts-ignore
    const raceResult = yield race({
      success: take(
        // @ts-ignore
        (action: IActionWithPayload) =>
          action.type === initAction.type &&
          action.payload.openModalType === null &&
          action.payload?.closeStatus === 'success'
      ),
      error: take(
        // @ts-ignore
        (action: IActionWithPayload) =>
          action.type === initAction.type &&
          action.payload.openModalType === null &&
          action.payload?.closeStatus === 'error'
      ),
      close: take(
        // @ts-ignore
        (action: IActionWithPayload) =>
          action.type === initAction.type &&
          action.payload.openModalType === null &&
          action.payload?.closeStatus === 'close'
      )
      // reopenModal: take(
      //  // @ts-ignore
      //   (action: IActionWithPayload) =>
      //     action.type === initAction.type &&
      //     action.payload.openModalType !== null
      // )
    });

    if (raceResult.success) yield initAction?.payload?.onSuccess?.();
    if (raceResult.error) throw new Error(raceResult.error?.toString?.());
    if (raceResult.reopenModal) skipCleanup = true;
  } catch (error: any) {
    yield initAction?.payload?.onError?.(error);
  } finally {
    if (!skipCleanup) yield initAction?.payload?.onCleanup?.();
  }
}

export function mafLifecycleController() {
  const lifecycleMap = new Map();

  return fork(function* lifecycleEventsCatcher() {
    yield takeEvery(
      // @ts-ignore
      (action: IActionWithPayload) =>
        action.type.startsWith('modals-and-forms.lfc.') &&
        action.payload.openModalType !== null,
      function* takeLeadingProxy(action: IActionWithPayload) {
        const key = action.type;
        if (!lifecycleMap.get(key)) {
          /** Spawn new task */
          // @ts-ignore
          const task = yield fork(mafLifecycleSaga, action);
          lifecycleMap.set(key, task);

          /** Await for task completion */
          yield join(task);
          lifecycleMap.delete(key);
        }
      }
    );
  });
}
