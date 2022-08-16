//lookup logic lives here

//employee lookup
$("#employee-lookup-search-button").on("click", function () {
  $("#employee-lookup-results").removeClass("js-hidden")
})

$("#employee-lookup-results").on("click", function () {
  $("#employee-lookup-results").addClass("js-hidden")
  $("#employee-lookup-selection").removeClass("js-hidden")
  $("#employee-lookup").val("Daniel Blair, SEO, Service Cloud Specialist")
})

$("#employee-lookup-clear-selection").on("click", function () {
  $("#employee-lookup").val("")
})


//approver lookup
$("#approver-lookup-search-button").on("click", function () {
  $("#approver-lookup-results").removeClass("js-hidden")
})

$("#approver-lookup-results").on("click", function () {
  $("#approver-lookup-results").addClass("js-hidden")
  $("#approver-lookup-selection").removeClass("js-hidden")
  $("#approver-lookup").val("Cahil De Menezes, SCS 2, Interaction Designer")
})

$("#approver-lookup-clear-selection").on("click", function () {
  $("#approver-lookup").val("")
})


//Home Office representative lookup
$("#home-office-representative-lookup-search-button").on("click", function () {
  $("#home-office-representative-lookup-results").removeClass("js-hidden")
})

$("#home-office-representative-lookup-results").on("click", function () {
  $("#home-office-representative-lookup-results").addClass("js-hidden")
  $("#home-office-representative-lookup-selection").removeClass("js-hidden")
  $("#home-office-representative-lookup").val("Max Thompson, EO, Client Relations Executive")
})

$("#home-office-representative-lookup-clear-selection").on("click", function () {
  $("#home-office-representative-lookup").val("")
})
