import { modertRef } from "components";
import { useAppDispatch } from "hooks/RTK";
import { useTranslation } from "react-i18next";
import { signOut } from "store";

export const useSignOut = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const prompt = () =>
    modertRef.current?.show({
      title: t("signOut.modal.title"),
      message: t("signOut.modal.message"),
      buttons: [
        {
          title: t("common.cancel"),
        },
        {
          title: t("common.signOut"),
          onPress: async () => {
            // await apiUser.logout();
            dispatch(signOut());
          },
        },
      ],
    });

  return { prompt };
};
