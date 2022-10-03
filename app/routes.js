const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////
router.post("/gift-for-someone-else-redirect", (req, res) => {
  let forSomeoneElse = req.session.data["for-someone-else"]
  if (forSomeoneElse == undefined) {
    res.redirect("gifts/gift-for-someone-else-error")
  } else {
    res.redirect("gifts/reporting")
  }
})

router.post("/reporting-redirect", (req, res) => {
  let reporting = req.session.data["reporting"]
  let forSomeoneElse = req.session.data["for-someone-else"]
  if (reporting == undefined) {
    res.redirect("gifts/reporting-error")
  } else if (reporting != undefined && forSomeoneElse == "yes") {
    res.redirect("gifts/on-behalf-of")
  } else if (reporting != undefined && forSomeoneElse == "no") {
    res.redirect("gifts/other-party-details")
  }
})

//CDM: Route to employee-lookup.html or other-recipient-or-donor-details.html based on who the gift recipient/donor is
router.post("/on-behalf-of-redirect", (req, res) => {
  let giftOnBehalfOf = req.session.data["on-behalf-of"]
  if (giftOnBehalfOf == "employee") {
    res.redirect("gifts/employee-lookup")
  } else {
    res.redirect("gifts/someone-else-details")
  }
})

router.post("/employee-lookup-redirect", (req, res) => {
  let employeeLookup = req.session.data["employee-lookup"]
  let employeeName = req.session.data["employee-name"]
  let employeeEmail = req.session.data["employee-email"]
  let employeeCCC = req.session.data["employee-cost-centre-code"]

  if (employeeLookup == "" && (employeeName == "" || employeeEmail == "" || employeeCCC == "")) {
    res.redirect("gifts/employee-lookup-error")
  } else {
    res.redirect("gifts/other-party-details")
  }
})

router.post("/someone-else-details-redirect", (req, res) => {
  let teamUnitOrDepartmentName = req.session.data["team-unit-or-department-name"]
  let homeOfficeRepresentativeLookup = req.session.data["home-office-representative-lookup"]

  if (teamUnitOrDepartmentName == "" && homeOfficeRepresentativeLookup == "") {
    res.redirect("gifts/someone-else-details-error")
  } else {
    res.redirect("gifts/other-party-details")
  }
})


router.post("/gift-details-redirect", (req, res) => {
  let actionReported = req.session.data["reporting"]
  let giftDate = req.session.data["date-received-or-offered"]
  let giftReason = req.session.data['reason-for-gift']
  let giftCost = req.session.data['cost-of-gift']
  let forSomeoneElse = req.session.data["for-someone-else"]

  if (giftDate == "" && giftReason == "" && giftCost == "") {
    res.redirect("gifts/gift-details-error")
  }

  if ((actionReported == "gift-received-and-accepted" || actionReported == "gift-received-and-rejected") && forSomeoneElse == "no") {
    res.redirect("gifts/summary")
  } else if ((actionReported == "gift-received-and-accepted" || actionReported == "gift-received-and-rejected") && forSomeoneElse == "yes") {
    res.redirect("gifts/delegated-authority-approval")
  } else {
    res.redirect("gifts/approved-supplier")
  }
})

//CDM: Skip non-approved-supplier-used-reason.html when an approved supplier is used
router.post("/approved-supplier-redirect", (req, res) => {
  let approvedSupplierUsed = req.session.data["approved-supplier-used"]
  let forSomeoneElse = req.session.data["for-someone-else"]
  let approverSupplierNotUsedReason = req.session.data["approved-supplier-not-used-reason"]

  if (approvedSupplierUsed == "yes" && forSomeoneElse == "yes") {
    res.redirect("gifts/delegated-authority-approval")
  } else if (approvedSupplierUsed == "yes" && forSomeoneElse == "no") {
    res.redirect("gifts/summary")
  } else if (approvedSupplierUsed == "no" && approverSupplierNotUsedReason == "") {
    res.redirect("gifts/approved-supplier-reason-error")
  } else if (approvedSupplierUsed == "no" && forSomeoneElse == "yes" && approverSupplierNotUsedReason != "") {
    res.redirect("gifts/delegated-authority-approval")
  } else if (approvedSupplierUsed == "no" && forSomeoneElse == "no" && approverSupplierNotUsedReason != "") {
    res.redirect("gifts/summary")
  }
})

//CDM: Route to approver-lookup.html or delegated-authority-disapproval-reason.html based on approval value
router.post("/delegated-authority-approval-redirect", (req, res) => {
  let delegatedAuthorityApproval = req.session.data["delegated-authority-approval"]
  if (delegatedAuthorityApproval == "yes") {
    res.redirect("gifts/approver-lookup")
  } else {
    res.redirect("gifts/summary")
  }
})
///// NAVIGATION ROUTES END /////

module.exports = router