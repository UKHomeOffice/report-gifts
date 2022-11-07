//lookup logic lives here

//employee lookup
$("#employee-lookup-search-button").on("click", function () {
  $("#employee-lookup-results").removeClass("js-hidden")
})

$("#employee-lookup-results").on("click", function () {
  $("#employee-lookup-results").addClass("js-hidden")
  $("#employee-lookup-selection").removeClass("js-hidden")
  $("#employee-lookup").val("Daniel Blair, 123451, Executive Officer, CX Specialist")
})

$("#employee-lookup-clear-selection").on("click", function () {
  $("#employee-lookup").val("")
})


//Home Office representative lookup
$("#home-office-representative-lookup-search-button").on("click", function () {
  $("#home-office-representative-lookup-results").removeClass("js-hidden")
})

$("#home-office-representative-lookup-results").on("click", function () {
  $("#home-office-representative-lookup-results").addClass("js-hidden")
  $("#home-office-representative-lookup-selection").removeClass("js-hidden")
  $("#home-office-representative-lookup").val("Max Thompson, 123452, Senior Executive Officer, CX Lead")
})

$("#home-office-representative-lookup-clear-selection").on("click", function () {
  $("#home-office-representative-lookup").val("")
})

//approver lookup
$("#approver-lookup-search-button").on("click", function () {
  $("#approver-lookup-results").removeClass("js-hidden")
})

$("#approver-lookup-results").on("click", function () {
  $("#approver-lookup-results").addClass("js-hidden")
  $("#approver-lookup-selection").removeClass("js-hidden")
  $("#approver-lookup").val("Andrea Richardson, 123453, SCS2, CX Architect")
})

$("#approver-lookup-clear-selection").on("click", function () {
  $("#approver-lookup").val("")
})