import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UnderConstruction from "@/components/under-construction";
import useIsTableList from "@/hooks/useIsTableList";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Employee = () => {
  const { isList } = useIsTableList({
    newForm: "new-employee",
    editForm: "edit",
  });

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Employees</CardTitle>
          {isList && (
            <Link to="/hc-v2-front/employees/new-employee">
              <Button variant="default">New Employee</Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
};

export default Employee;
