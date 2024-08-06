import { useWebform } from "../hooks/useWebform";
import { camelize, snakeCase } from "../utils/utils";
import { wfcFormGeneric } from "../WFCFormGeneric/WFCFormGeneric";

interface EmptyFields {
  fieldName: string
  value?: string
}
export const Webform = () => {
  const { componentsList, getComponentFormByName } = useWebform()
  //console.log(componentsList)
  //console.log(camelize("convert this to camel case without spaces"))


  const generateEmptyFields = (fieldName: string, fieldLength: number = 1) => {
    /*if (fieldName != "") {
      let arrayNames: EmptyFields[] = []
      for (let i = 0; i < fieldLenght; i++) {
        const newObj: EmptyFields = {
          fieldName: fieldName + (i + 1).toString(),
          value: ""
        }
        arrayNames = [...arrayNames, newObj]
      }
      return arrayNames
    } */
    if (!fieldName) {
      return [];
    }

    return Array.from({ length: fieldLength }, (_, i) => ({
      fieldName: `${fieldName}${i + 1}`,
      value: ""
    }));
  }

  console.log(generateEmptyFields("short_name", 4))

  type EmptyFields = {
    fieldName: string;
    value: string;
  };

  const separateKeysAndValues = (fields: EmptyFields[]): { keys: string[]; values: string[] } => {
    const keys: string[] = [];
    const values: string[] = [];

    for (const field of fields) {
      keys.push(field.fieldName);
      values.push(field.value);
    }

    return { keys, values };
  };

  // Ejemplo de uso
  const fieldsArray: EmptyFields[] = [
    { fieldName: "field1", value: "value1" },
    { fieldName: "field2", value: "value2" },
    { fieldName: "field3", value: "" }
  ];

  const { keys, values } = separateKeysAndValues(fieldsArray);
  console.log("Keys:", keys);    // Output: ["field1", "field2", "field3"]
  console.log("Values:", values); // Output: ["value1", "value2", ""]


  return (
    <>
      <div>
        <div>Form</div>
        {
          componentsList.map((component) => (
            wfcFormGeneric({
              wrappedComponent: getComponentFormByName(component.name),
              onChangeProps: (data) => {
                //updateConfComponent(idComponentOpenConf, data, idWf)                
                console.log('Webform | onChangeProps', data)
              },
              objConf: component.objConf // componentSelected.objConf
            })
          ))
        }
      </div>
    </>
  );
}


/*  */