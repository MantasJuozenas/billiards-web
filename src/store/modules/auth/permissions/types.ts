/* eslint-disable prettier/prettier */
export const Permissions: { [name: string]: { id: number, name:string } } = {
  planSelect: { id: 1, name:'Plano pasirinkimas' }
 }
 // eslint-disable-next-line no-warning-comments
 export const PermissionOptions: { [key: number]: { id: number, name: string, value: false | string }} = {
  1: {id: 1, name:'Visų darbuotojų', value: 'all-workers'},
  2: {id: 2, name:'Tik savo ir kitų užimtumą', value: 'only-employment'},
  3: {id: 3, name:'Tik savo', value: 'only-self'},
  4: {id: 4, name:'Nieko', value: false}
}

export const PermissionPlan = {
  1: 'is_free_plan',
  2: 'is_pro_plan',
  3: 'is_user_personal',
  4: 'is_manager_personal'
}

export interface IPermissions {
  planSelect: boolean;
  calendarView: false | 'all-workers' | 'only-employment' | 'only-self';
}

 /* eslint-enable prettier/prettier */
export const RelatedPermissions = {
  /*
  [key: permissionId]: {
    permissionsOptions || PermissionId: [
      {
        relatedPermissions: [
          {
            id: permissionOptionId,
            disabledIfOptionActive: disable option if related option is active.
            disabledIfInactive: Disable field if related field is inactive.
            disabledIfActive: Disable field if related field is active.
          }
        ]
      }
    ]
  }
  */
  // calendarView: { id: 11, name:'Vizitų peržiūra kalendoriuje' },
  [`${Permissions?.calendarView?.id}`]: {
    //  1: {id: 1, name:'Visų darbuotojų', value: 'all-workers'},
    [`${PermissionOptions?.[1]?.id}`]: {
      relatedPermissions: [
        {
          id: Permissions?.appointmentManagement?.id,
          disabledIfOptionActive: [],
          disabledIfInactive: false,
          disabledIfActive: false
        }
      ]
    },
    // 2: {id: 2, name:'Tik savo ir kitų užimtumą', value: 'only-employment'},
    [`${PermissionOptions?.[2]?.id}`]: {
      relatedPermissions: [
        {
          id: Permissions?.appointmentManagement?.id,
          disabledIfOptionActive: [PermissionOptions?.[5]?.id],
          disabledIfInactive: false,
          disabledIfActive: false
        }
      ]
    },
    // 3: {id: 3, name:'Tik savo', value: 'only-self'},
    [`${PermissionOptions?.[3]?.id}`]: {
      relatedPermissions: [
        {
          id: Permissions?.appointmentManagement?.id,
          disabledIfOptionActive: [PermissionOptions?.[5]?.id],
          disabledIfInactive: false,
          disabledIfActive: false
        }
      ]
    },
    // 4: {id: 4, name:'Nieko', value: false},
    [`${PermissionOptions?.[4]?.id}`]: {
      relatedPermissions: [
        {
          id: Permissions?.appointmentManagement?.id,
          disabledIfOptionActive: [
            PermissionOptions?.[5]?.id,
            PermissionOptions?.[6]?.id
          ],
          disabledIfInactive: false,
          disabledIfActive: false
        }
      ]
    }
  }
};
