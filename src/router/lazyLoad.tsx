import { lazy, Suspense } from "react";
import { MenuType } from "@/types/menu";

const Layout: any = lazy(() => import("@/components/Layout"));
const needLayout = ["Dashboard"];

interface RouteType {
  path: string;
  element: JSX.Element;
  children: RouteType[];
}

export function handleMenus(menusList: MenuType[]): RouteType[] {
  return menusList.map((e) => {
    const index = needLayout.findIndex((_) => _ === e.element);
    return {
      path: e.url,
      title: e.title,
      element:
        index !== -1
          ? lazyLoad(needLayout[index], "views", true)
          : e.element === "Layout"
          ? lazyLoad(e.element || "", "components")
          : lazyLoad(e.element || ""),
      children: e?.children.length > 0 ? handleMenus(e.children) : [],
    };
  });
}

const lazyLoad = (
  eleUrl: string,
  folderName: string = "views",
  needLayout: boolean = false
): JSX.Element => {
  console.log(folderName, eleUrl, "");
  const modules = import.meta.glob(`../*/*/index.tsx`) as any;
  const Model = lazy(modules[`../${folderName}/${eleUrl}/index.tsx`]);
  if (needLayout) {
    return (
      <Layout>
        <Model />
      </Layout>
    );
  } else {
    return <Model />;
  }
};
export default lazyLoad;
