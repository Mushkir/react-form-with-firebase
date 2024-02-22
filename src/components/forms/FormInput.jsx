import PropTypes from "prop-types";

const FormInput = ({ type = "text", placeholder, register, name, error }) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        className="px-4 py-2 bg-gray-100 outline-none rounded w-full"
        placeholder={placeholder}
        {...register}
      />
      {error && <small>{error.message}</small>}
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.object,
  name: PropTypes.string,
  error: PropTypes.object,
};

export default FormInput;
