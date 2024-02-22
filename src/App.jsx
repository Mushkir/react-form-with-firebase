import { useForm } from "react-hook-form";
import FormInput from "./components/forms/FormInput";
import FormTextArea from "./components/forms/FormTextArea";
import FormSelect from "./components/forms/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase/index";

const formSchema = z.object({
  fullName: z.string().min(10),
  email: z.string().email(),
  comments: z.string().min(10),
  qualification: z.string().min(10),
  address: z.string().min(10),
  jobRole: z.string(),
});

const COLLECTION_NAME = "candidates";

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(formSchema) });

  const sendDataToServer = async (data) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
      console.log("Document written with ID: ", docRef.id);
      alert("Added!");
      reset();
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log(data);
  };

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function getDataFromFirebase() {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      setCandidates(
        querySnapshot.docs.map((candidatesDetails) => candidatesDetails.data())
      );

      if (querySnapshot.size === 0) {
        console.log("No Records!");
      }
    }

    getDataFromFirebase();
  }, []);

  return (
    <div className=" bg-gray-100 min-h-screen p-10">
      <header className="bg-amber-500 px-10 py-5 text-center font-semibold">
        Interview Scheduled Candidates
      </header>

      <main className="container mx-auto px-10 my-5">
        <section className="bg-white p-5 rounded shadow">
          <h2 className="font-semibold text-lg">
            Interview Scheduled Candidates
          </h2>
          <form
            className="space-y-4 mt-5"
            onSubmit={handleSubmit(sendDataToServer)}
          >
            <FormSelect
              name="jobRole"
              register={register("jobRole")}
              error={errors.jobRole}
            />
            <FormInput
              name="fullName"
              placeholder="Full name"
              register={register("fullName")}
              error={errors.fullName}
            />
            <FormInput
              name="email"
              placeholder="Email"
              register={register("email")}
              error={errors.email}
            />
            <FormTextArea
              name="address"
              placeholder="Address"
              register={register("address")}
              error={errors.address}
            />
            <FormTextArea
              name="qualification"
              placeholder="Qualification"
              register={register("qualification")}
              error={errors.qualification}
            />
            <FormTextArea
              name="comments"
              placeholder="Comments"
              register={register("comments")}
              error={errors.comments}
            />
            <button className=" px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white">
              Submit
            </button>
          </form>
        </section>

        {/* {JSON.stringify(candidates)} */}
        {/* Display Values */}
        <section className="my-10">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Job Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Full Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidates) => {
                  return (
                    <tr
                      key={candidates.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {candidates.jobRole}
                      </th>
                      <td className="px-6 py-4">{candidates.fullName}</td>
                      <td className="px-6 py-4">{candidates.email}</td>
                      <td className="px-6 py-4">{candidates.qualification}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
