import React, { useState } from "react";

export const useInput = (initValue: string) => {
    const [ value, setValue ] = useState<string>(initValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return { value, onChange };
}