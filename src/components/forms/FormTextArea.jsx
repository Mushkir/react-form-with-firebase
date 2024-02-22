import PropTypes from "prop-types";

const FormTextArea = ({
  type = "text",
  placeholder,
  register,
  name,
  error,
}) => {
  return (
    <div>
      <textarea
        type={type}
        name={name}
        className="px-4 py-2 bg-gray-100 outline-none rounded w-full"
        placeholder={placeholder}
        {...register}
      ></textarea>
      {error && <small>{error.message}</small>}
    </div>
  );
};

FormTextArea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.object,
  name: PropTypes.string,
  error: PropTypes.object,
};

export default FormTextArea;
