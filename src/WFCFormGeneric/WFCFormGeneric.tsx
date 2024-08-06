import React, { ReactElement, ReactNode } from "react";

export const wfcFormGeneric = ({
    wrappedComponent,
    onChangeProps,
    objConf
}: {
    wrappedComponent: ReactElement<WFCFormGenericI>,
    onChangeProps: CallableFunction,
    objConf?: object
}): ReactNode => {


    return React.cloneElement(wrappedComponent as ReactElement, {
        onChangeProps,
        objConf
    })
}

export interface WFCFormGenericI {
    onChangeProps: CallableFunction;
}