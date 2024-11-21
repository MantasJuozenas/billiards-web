import * as Yup from 'yup';

export const TempHackSchema = Yup.object().shape({
  hackError: Yup.number().required('HackError')
});
