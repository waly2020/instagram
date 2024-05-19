const ButtonAuth = ({...props}) => {
    return (
        <button {...props} className="w-full py-2 px-3 rounded bg-blue-500 text-white">{props.text}</button>
    );
}

export default ButtonAuth;
