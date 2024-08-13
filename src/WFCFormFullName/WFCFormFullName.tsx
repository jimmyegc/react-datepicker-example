import React, { useEffect } from 'react'
import { useValidWFCForm } from '../hooks/useValidWFCForm';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

export const WFCFormFullName = ({
  onChangeProps,
  objConf,
}: {
  onChangeProps?: (obj) => {};
  objConf?: any;
}) => {

  const methods = useForm();
  /*useValidWFCForm({
    clearErrors: methods.clearErrors,
    idActually: '0', //methods.watch("idComponent"),
    loadDataFormHandler: () => loadDataFormHandler(),
    handleSubmit: methods.handleSubmit,
    objConf,
  });*/

  const control = methods.control;
  const change = useWatch({ control });

  const loadDataFormHandler = () => {
    //methods.setValue("idComponent", idComponentOpenConf);    
    //methods.setValue("nombre", objConf?.fieldName);
  }

  // console.log("change", change);
  const watchProps = {
    nombre: methods.watch("nombre"),
    apellido: methods.watch("apellido")
  };

  useEffect(() => {
    onChangeProps(watchProps);
  }, [change]);

  return (
    <>
      <FormProvider {...methods}>
        <div>WFCFormFullName</div>
        <br />
        <div>
          <label>{objConf.sectionLabel}</label>
        </div>
        <input type="text"
          {...methods.register("nombre")}
          placeholder={objConf.fieldName}
        />
        <input type="text"
          {...methods.register("apellido")}
        />
        <p>{JSON.stringify(objConf)}</p>
      </FormProvider>
    </>);
}
