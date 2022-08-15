// Created this file to house all the custom JS logic that I add
//approver lookup
$("#approver-lookup-search-button").on("click", function () {
  $("#approver-lookup-results").removeClass("js-hidden")
})

$("#approver-lookup-results").on("click", function () {
  $("#approver-lookup-results").addClass("js-hidden")
  $("#approver-lookup").val("Cahil De Menezes, SCS 2, Interaction Designer")
})

//Employee lookup
$("#employee-lookup-search-button").on("click", function () {
  $("#employee-lookup-results").removeClass("js-hidden")
})

$("#employee-lookup-results").on("click", function () {
  $("#employee-lookup-results").addClass("js-hidden")
  $("#employee-lookup").val("Daniel Blair, SEO, Service Cloud Specialist")
})

// Department lookup
$("#someone-else-department-lookup-search-button").on("click", function () {
  $("#department-lookup-results").removeClass("js-hidden")
})

$("#department-lookup-results").on("click", function () {
  $("#department-lookup-results").addClass("js-hidden")
  $("#someone-else-department-lookup").val("BXL - 132777, Active, Software")
})




