import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form';

export const WFCFormShortText = ({
  onChangeProps,
  objConf,
}: {
  onChangeProps?: (obj) => {};
  objConf?;
}) => {


  const methods = useForm<>();
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
    methods.setValue("apellido", objConf?.fieldName);
  }

  // console.log("change", change);
  const watchProps = {
    apellido: methods.watch("apellido")
  };

  useEffect(() => {
    onChangeProps(watchProps);
  }, [change]);


  return (<>
    <div>WFCFormShortText</div>
    <p>{JSON.stringify(objConf)}</p>

    <input type="text"
      {...methods.register("apellido")}
      placeholder={objConf.fieldName}
    />
  </>);
}
