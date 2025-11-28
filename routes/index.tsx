import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Table from "../islands/TableRedirectButton.tsx";
import { PROJECT_NAME } from "../CONSTANTS.ts";
import TableRedirectButton from "../islands/TableRedirectButton.tsx";

export default define.page(function Home(ctx) {

  console.log("Shared value " + ctx.state.shared);

  return (
    <div>
      <Head>
        <title>{PROJECT_NAME}</title>
      </Head>
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the draftr logo"
        />
      </div>
      <div class="mx-auto max-w-screen-md flex flex-col items-center justify-center">
        <TableRedirectButton />
      </div>
    </div>
  );
});
