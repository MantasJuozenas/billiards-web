// import React from 'react';

// export function parsableFields(
//   template: string,
//   ...inserts: React.ReactNode[]
// ): any {
//   if (!inserts?.length) {
//     return template;
//   }
//   const placeholderReg = /##\d*/;
//   const parts = template.split(placeholderReg);
//   const returnable = [];

//   for (let i = 0, key = 0; i < parts.length; i++) {
//     returnable.push(<React.Fragment key={key++}>{parts[i]}</React.Fragment>);
//     if (i < parts.length - 1 && inserts.length > 0) {
//       returnable.push(
//         <React.Fragment key={key++}>{inserts.shift()}</React.Fragment>
//       );
//     }
//   }

//   return returnable;
// }
export {};
