import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/nyheter")({
  component: NyheterLayout,
});

function NyheterLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}