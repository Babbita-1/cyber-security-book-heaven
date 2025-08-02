import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder, validation = {}, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      {type === 'textarea' ? (
        <textarea
          {...register(name, validation)}
          className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 resize-none"
          placeholder={placeholder}
          style={{ height: '100px', overflowY: 'auto' }}
        />
      ) : (
        <input
          type={type}
          {...register(name, validation)}
          className=" p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
          placeholder={placeholder}
          min={type === 'number' ? 1 : undefined}
        />
      )}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputField;