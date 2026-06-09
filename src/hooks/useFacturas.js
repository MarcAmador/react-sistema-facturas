import { useContext } from "react";

import { FacturaContext } from "../context/FacturaContext";

export function useFacturas() {

  return useContext(FacturaContext);

}