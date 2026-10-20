/* Public lesson index for the NEW Grade 12 Lesson Plans & Practice area.
 * This is separate from the legacy Grade 12 Vocabulary units.
 * Future lesson imports update this catalog and the corresponding published question files.
 * NEVER store locked answer keys or private teacher comments in this public repository.
 */
(function(global){
  "use strict";
  const units=Array.from({length:7},function(_,index){
    const number=index+1;
    return {
      id:number,
      title:"Unit "+number,
      description:"",
      docUrl:"",
      lessonPublished:false,
      practicePublished:false,
      practice:{mcqs:[],passages:[]}
    };
  });
  global.LessonPlanCatalog=Object.freeze({units:units});
})(window);
