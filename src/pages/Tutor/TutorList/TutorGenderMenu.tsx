import { InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Filters } from "../../../type/TutorListType";

type GenderType = {
  handleFilterChange: Function;
  filters: Filters;
};

export default function TutorGenderMenu({
  handleFilterChange,
  filters,
}: GenderType) {
  return (
    <>
      <InputLabel id="gender-label">성별</InputLabel>
      <Select
        labelId="gender-label"
        value={filters.userSex}
        onChange={(event) => handleFilterChange(event, "userSex")}
        autoWidth
        label="성별"
      >
        <MenuItem value="">전체</MenuItem>
        <MenuItem value="M">남성</MenuItem>
        <MenuItem value="W">여성</MenuItem>
      </Select>
    </>
  );
}
