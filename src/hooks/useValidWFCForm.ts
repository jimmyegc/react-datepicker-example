import { SubmitHandler } from "react-hook-form"
import { useWebFormSetupStore } from "../../stores/createModuleWebFormsSetup";
import { useEffect } from "react";
import { useWfIdStore } from "../../stores/createModuleWFId";

/**
 * useValidWFCForm es un hook personalizado que gestiona la validacion del formulario en el que se implementa
 * cada vez que se sustituye el formulario o la data del componente WFC
 *
 * @param {CallableFunction} [clearErrors] - funcion proporcionada por rhf para limpiar los errores del formulario
 * @param {CallableFunction} [loadDataFormHandler] - funcion que se ejecuta para llenar el formulario con los datos recibios en objConf
 * se usa setValue de rhf por cada campo
 *  ejemplo: const loadDataFormHandler = () => {
        setValue('idUComponent', idComponentOpenConf)
        .
        .
        .
    }
 * @param {string|undefined} [idActually] - se usa watch de rhf para pasar el id del componente actual en el formulario
 *   antes de hacer el cambio a la configuracion de otro componente
    
 * @param {CallableFunction} [handleSubmit] - el handleSubmit que proporciona rhf para lanzar el submit del formulario
 * @param {CallableFunction} [objConf] - objeto que debe tener todo WFCForm, es el json de guardado de su configuracion
 */

export const useValidWFCForm = <T,>({
    clearErrors,
    loadDataFormHandler,
    idActually,
    handleSubmit,
    objConf
}: {
    clearErrors: CallableFunction;
    idActually: string;
    loadDataFormHandler: CallableFunction;
    handleSubmit: CallableFunction;
    objConf?: T;
}) => {
    const { id: idWf } = useWfIdStore();
    const {
        validateConfComponent,
        resetValidate,
        idComponentOpenConf,
        validating } = useWebFormSetupStore()

    const onSubmit: SubmitHandler<T> = () => {
        validateConfComponent(true, idComponentOpenConf, idWf)
    }
    const onInvalid = () => validateConfComponent(false, idComponentOpenConf, idWf)

    const onSubmitChangeData: SubmitHandler<T> = () => {
        validateConfComponent(true, idActually, idWf)
        loadDataFormHandler()
    }

    const onInvalidChangeData = () => {
        loadDataFormHandler()
        if (idActually !== undefined) validateConfComponent(false, idActually, idWf)
        clearErrors()
    }

    useEffect(() => {
        if (validating) {
            handleSubmit(onSubmit, onInvalid)()
            resetValidate()
        }
    }, [validating])

    useEffect(() => {
        handleSubmit(onSubmitChangeData, onInvalidChangeData)()
    }, [objConf])

}