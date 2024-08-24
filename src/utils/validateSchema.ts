/** @format */

import * as yup from "yup";

export const loginSchema = yup.object().shape({
    phone_number: yup
        .string()
        .matches(
            /^\+\d{12}$/,
            "Numero doit commence avec + et doit etre complet"
        )
        .required("Votre numero de telephone"),
    password: yup.string().required("Entre le mot de passe"),
});
