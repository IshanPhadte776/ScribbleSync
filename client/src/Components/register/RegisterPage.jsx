import React from "react";

function RegisterPage() {
  return (
    <div className="bg-customPink py-16 mt-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Register
      </h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pronouns"
              className="block text-gray-700 font-bold mb-2"
            >
              Pronouns (Mr. Mrs. Ms.)
            </label>
            <input
              type="text"
              id="pronouns"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your pronouns"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="numberOfStudents"
              className="block text-gray-700 font-bold mb-2"
            >
              Number of Students
            </label>
            <select
              id="numberOfStudents"
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="1-10">1-10</option>
              <option value="11-20">11-20</option>
              <option value="20-30">3</option>
              <option value="30-100">4</option>
              <option value="101+">5+</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-customLightOrange text-white px-4 py-2 rounded-lg font-bold w-full hover:bg-customOrange"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
