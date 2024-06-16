import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Categories = () => {
  /*
    TODO
      Editar: Actualizar el elemento en el state con el index,
  */

      const params = useLocation();
      const newCategory = params.pathname.endsWith("new-category")
      

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle>Categories</CardTitle>
        <Link to={newCategory ? "/hc-v2-front/category" : "/hc-v2-front/category/new-category"}><Button variant={newCategory ? "outline" : "default"}>{newCategory ? "Go back" : "New Category"}</Button></Link>
        </div>
      </CardHeader>

      <CardContent>
      <div className="flex flex-col gap-5">
        <Outlet />
        
        </div>
      </CardContent>
    </Card>
  );
};

export default Categories;
