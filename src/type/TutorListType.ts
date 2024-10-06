export type Tutor = {
  userNo: number;
  tutorProfileImg: string;
  userName: string;
  keyword: string[];
  school: string;
  classArea: string;
  level: string;
  userSex: string;
  classType: string;
};

export type Filters = {
  userSex: string;
  classType: string;
  levels: string[];
  searchTerm: string;
};
