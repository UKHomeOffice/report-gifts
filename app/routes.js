const e = require('express')
const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

///// NAVIGATION ROUTES START /////
router.post("/received-or-offered-redirect", (req, res) => {
  let giftReceivedOrOffered = req.session.data["received-or-offered"]
  if (giftReceivedOrOffered == undefined) {
    res.redirect("gifts/received-or-offered-error")
  } else {
    res.redirect("gifts/individual-gift")
  }
})

//CDM: Skip on-behalf-of-gift.html
router.post("/individual-gift-redirect", (req, res) => {
  let individualGift = req.session.data["individual-gift"]
  if (individualGift == "yes") {
    res.redirect("gifts/other-party-details")
  } else {
    res.redirect("gifts/on-behalf-of-gift")
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
  console.log(employeeLookup)
  if (employeeLookup == "") {
    res.redirect("gifts/employee-lookup-error")
  } else {
    res.redirect("gifts/other-party-details")
  }
})

router.post("/someone-else-details-redirect", (req, res) => {

  let name = req.session.data["someone-else-name"]
  let email = req.session.data["someone-else-email"]
  let grade = req.session.data["someone-else-grade"]
  let departmentLookup = req.session.data["someone-else-department-lookup"]

  if (name == "" && email == "" && grade == undefined && departmentLookup == "") {
    res.redirect("gifts/someone-else-details-error-all")
  } else if (name != "" && email != "" && grade == undefined && departmentLookup == "") {
    res.redirect("gifts/someone-else-details-error-grade-and-department")
  } else {
    res.redirect("gifts/other-party-details")
  }
})

router.post("/gift-details-redirect", (req, res) => {
  let giftActionReported = req.session.data["received-or-offered"]

  let giftDate = new Date(req.session.data["date-received-or-offered"])
  let today = new Date()
  let giftDateInThePast = giftDate <= today

  if (!giftDateInThePast) {
    res.redirect("gifts/gift-details-error-date")
  }

  if (giftDateInThePast && giftActionReported == "received") {
    res.redirect("gifts/gift-decision")
  } else if (giftDateInThePast && giftActionReported == "offered") {
    res.redirect("gifts/approved-supplier")
  }
})

router.post("/gift-decision-redirect", (req, res) => {
  let individualGift = req.session.data["individual-gift"]
  if (individualGift == "yes") {
    res.redirect("gifts/summary")
  } else {
    res.redirect("gifts/delegated-authority-approval")
  }
})

//CDM: Skip non-approved-supplier-used-reason.html when an approved supplier is used
router.post("/approved-supplier-redirect", (req, res) => {
  let approvedSupplierUsed = req.session.data["approved-supplier-used"]
  let individualGift = req.session.data["individual-gift"]
  let approverSupplierNotUsedReason = req.session.data["approved-supplier-not-used-reason"]

  if (approvedSupplierUsed == "yes" && individualGift == "no") {
    res.redirect("gifts/delegated-authority-approval")
  } else if (approvedSupplierUsed == "yes" && individualGift == "yes") {
    res.redirect("gifts/summary")
  } else if (approvedSupplierUsed == "no" && approverSupplierNotUsedReason == "") {
    res.redirect("gifts/approved-supplier-reason-error")
  } else if (approvedSupplierUsed == "no" && individualGift == "no" && approverSupplierNotUsedReason != "") {
    res.redirect("gifts/delegated-authority-approval")
  } else if (approvedSupplierUsed == "no" && individualGift == "yes" && approverSupplierNotUsedReason != "") {
    res.redirect("gifts/summary")
  }
})

//CDM: Route to approver-lookup.html or delegated-authority-disapproval-reason.html based on approval value
router.post("/delegated-authority-approval-redirect", (req, res) => {
  let delegatedAuthorityApproval = req.session.data["delegated-authority-approval"]
  if (delegatedAuthorityApproval == "yes") {
    res.redirect("gifts/approver-lookup")
  } else {
    res.redirect("gifts/delegated-authority-disapproval-reason")
  }
})
///// NAVIGATION ROUTES END /////

module.exports = router
