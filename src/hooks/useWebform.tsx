import { ReactElement } from "react";
import { WFCFormFullName } from "../WFCFormFullName/WFCFormFullName";
import { WFCFormGenericI } from "../WFCFormGeneric/WFCFormGeneric";
import { WFCFormShortText } from "../WFCFormShortText/WFCFormShortText";
import { FullnameComponent } from "../FullnameComponent/FullnameComponent";
import { ShortTextComponent } from "../ShortTextComponent/ShortTextComponent";

type typeOfComponent = "tool" | "input" | "action";
interface StoredComponent {
  idWebFormComponente: number;
  name: string;
  component: ({ id }: { id: string }) => JSX.Element;
  configForm: ReactElement<WFCFormGenericI>;
  isExternalColumn: boolean;
  typeOfComponent: typeOfComponent;
}
export const useWebform = () => {
  const componentsList = [
    {
      id: "4098606c-a84c-473c-8199-38d5f36e9ae7",
      name: "FullnameComponent",
      field: "name",
      objConf: {
        fieldName: "nombre",
        sectionLabel: "Nombre"
      }
    },
    {
      id: "836c41be-09ee-494c-80a8-8af7990947d9",
      name: "ShortTextComponent",
      field: "lastname",
      objConf: {
        fieldName: "lastname",
        inputLabel: "Apellido"
      }
    },
  ];

  const components: StoredComponent[] = [
    {
      idWebFormComponente: 1,
      name: "FullnameComponent",
      component: FullnameComponent,
      configForm: <WFCFormFullName />,
      isExternalColumn: false,
      typeOfComponent: "input",
    },
    {
      idWebFormComponente: 2,
      name: "ShortTextComponent",
      component: ShortTextComponent,
      configForm: <WFCFormShortText />,
      isExternalColumn: true,
      typeOfComponent: "input",
    }
  ]

  const getComponentByName = (name: string) => {
    const findComponent = components.find((c) => c.name === name);
    return findComponent?.component;
  };

  const getComponentFormByName = (
    name: string
  ): ReactElement<WFCFormGenericI> => {
    const findComponent = components.find((c) => c.name === name);
    //console.log(findComponent)
    return findComponent.configForm;
  };

  return {
    componentsList,
    getComponentByName,
    getComponentFormByName
  };
};
