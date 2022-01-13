import { getProviders, signIn } from "next-auth/react";

function login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-gray-600 min-h-screen justify-center w-full">
      <img
        src="https://cdn.pixabay.com/photo/2017/04/19/10/24/vinyl-2241789_1280.png"
        className="w-56 mb-5"
        alt=""
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Log in with {provider.name}
          </button>
        </div>
      ))}
      {console.log(Object.values(providers))}
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  console.log(providers);
  return {
    props: {
      providers,
    },
  };
}

export default login;
