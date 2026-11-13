(()=>{
"use strict";
// Grade 12 · Unit 8 — one Test slot. Questions will be added after the teacher supplies the test.
// Internal ID 88 deliberately preserves the existing "Ôn lại cơ bản" Unit 8 route and learner progress.
const questions=[];
const explanations=[];
const explanationById={};

window.G12_U8_TEST_BANK={
  grade:12,
  unit:88,
  displayUnitNumber:8,
  displayUnitLabel:"Unit 8",
  title:"Unit 8",
  subtitle:"Test 1",
  version:1,
  testOnly:true,
  trackSetCompletion:true,
  questions,
  explanations,
  explanationById,
  levelConfig:{
    1:{
      label:"Test",
      name:"Test 1",
      title:"Test 1",
      note:"Chờ đề từ giáo viên",
      fixedOrder:true,
      pending:true,
      pool:[]
    }
  }
};
})();
