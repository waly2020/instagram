import { forwardRef } from "react";

const InputIcon = forwardRef(({...props},ref) => {
    return (
        <div className="relative flex items-center gap-3 border px-2 bg-gray-50 rounded">
          {props.icon}<input required={true} ref={ref} {...props} className="bg-gray-50 w-full py-2 outline-none"/>
        </div>
    );
});

export default InputIcon;
