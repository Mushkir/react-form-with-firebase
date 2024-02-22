import PropTypes from "prop-types";

const FormSelect = ({ name, register, error }) => {
  return (
    <div>
      <select
        name={name}
        className="px-4 py-2 rounded bg-gray-100 w-full outline-none"
        {...register}
      >
        <option>--Select Job--</option>
        <option value="ui-developer">UI Developer</option>
        <option value="backend-developer">Backend Developer</option>
        <option value="database-developer">Database Developer</option>
        <option value="fullstack-developer">Fullstack Developer</option>
      </select>
      {/* {error && <small className="text-red-500">{error.message}</small>} */}
    </div>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.object,
};

export default FormSelect;
