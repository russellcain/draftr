import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { PROJECT_NAME } from "../CONSTANTS.ts";
import RedirectButton from "../islands/RedirectButton.tsx";

export default define.page(function Home(ctx) {

  console.log("Shared value " + ctx.state.shared);

  return (
    <div>
      <Head>
        <title>{PROJECT_NAME}</title>
      </Head>
      <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          className="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the draftr logo"
        />
      </div>
      <div className="mx-auto max-w-screen-md flex flex-col items-center justify-center">
        <RedirectButton href='/table' displayText="View Players"/>
      </div>
    </div>
  );
});
