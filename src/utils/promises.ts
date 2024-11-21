export async function LifecycleRequest<Return>(
  props: G.ILifecycleRequest<Return>
) {
  try {
    await props?.onPrepare?.();
    const result = await props?.call?.();
    await props?.onSuccess?.(result);

    return result;
  } catch (error: G.Ignored) {
    if ('onError' in props) {
      await props?.onError?.(error);
    } else {
      throw error;
    }
  } finally {
    await props?.onCleanup?.();
  }
}
