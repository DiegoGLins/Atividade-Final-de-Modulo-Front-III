import { RootState } from '../../store';
import { useAppSelector } from '../../store/hooks';
import ErrandsType from '../../types/ErrandsType';

export const getUserErrands: ErrandsType[] = (userID: string) => {
  const errandsRedux = useAppSelector((state: RootState) => state.errands);
  const ids = Object.keys(errandsRedux);
  return ids
    .map((id: string) => errandsRedux.entities[id])
    .filter(errand => errand!== undefined)
    .filter(errand => {
      if(userID === errand.userId) {
        return errand;
      }
    });
};
