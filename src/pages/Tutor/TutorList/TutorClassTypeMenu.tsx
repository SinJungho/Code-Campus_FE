import { InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Filters } from "../../../type/TutorListType";

type ClassType = {
  handleFilterChange: Function;
  filters: Filters;
};

export default function TutorClassTypeMenu({
  handleFilterChange,
  filters,
}: ClassType) {
  return (
    <>
      <InputLabel id="class-type-label">수업 방식</InputLabel>
      <Select
        labelId="class-type-label"
        value={filters.classType}
        onChange={(event) => handleFilterChange(event, "classType")}
        autoWidth
        label="수업 방식"
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="OFF">오프라인</MenuItem>
        <MenuItem value="ON">온라인</MenuItem>
      </Select>
    </>
  );
}
