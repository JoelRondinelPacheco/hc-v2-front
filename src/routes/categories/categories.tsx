import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useIsTableList from "@/hooks/useIsTableList";

const Categories = () => {
  /*
    TODO
      Editar: Actualizar el elemento en el state con el index,
  */
  const { isList } = useIsTableList({
    newForm: "new-category",
    editForm: "edit"
  })
      

  return (
    <Card className="">
      <CardHeader>
        <div className="flex justify-between">
        <CardTitle>Categories</CardTitle>
        { isList &&
        <Link to="/hc-v2-front/category/new-category"><Button variant="default">New Category</Button></Link>
        }
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
