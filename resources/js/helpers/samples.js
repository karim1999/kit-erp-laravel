let Constants = Object.freeze({
	header: {
		name: ""
	},
	samplePricingItem: {
	    selected: false,
		productId: "",
        partNumber: "",
        vendorPartNumber: "",
        type: "",
		name: "",
		description: "",

		quantity: 1,
        unit: "Month",

        costPrice: 0,
        unitPrice: 0,

        margin: 0,
        marginType: "%",

        discount: 0,
        discountType: "%",

		gross: 0,
		net: 0,
	},
	// sampleFormItem: {
	// 	partNumber: "",
	// 	name: "",
	// 	description: "",
	// 	quantity: 1,
	// 	inRate: 0,
	// 	outRate: 0,
	// 	margin: 0,
	// 	marginType: "%",
	// 	discount: 0,
	// 	discountType: "%",
	// 	amount: 0,
	// 	actual: 0,
	// 	product_id: 0,
	// 	period: 1,
	// 	periodUnit: "Month",
	// 	unit: "Month",
	// 	isText: false,
	// 	isHeader: false,
	// 	selectedDays: []
	// },
	sampleOpportunity: {
		Expiry: "",
		Stage: "",
		Owner: "",
		Deal_Name: "",
		Engagement_Type: "",
		Entity: "",
		Currency: "",
		Account_Name: "",
		Contact_Name: "",
		status: "Confirmed",
	},
	statusTypes: [
        {
            value: "Draft",
            color: "warning"
        },
        {
            value: "Submitted",
            color: "warning"
        },
        {
            value: "In Review",
            color: "success"
        },
        {
            value: "Revised",
            color: "dark"
        },
        {
            value: "Accepted",
            color: "secondary"
        },
        {
            value: "Expired",
            color: "info"
        },
        {
            value: "Archived",
            color: "info"
        }
	],
	approvalStatusTypes: [
		{
			value: "Pre-Approved",
			color: "warning"
		},
		{
			value: "Pending Approval",
			color: "success"
		},
		{
			value: "Revision Required",
			color: "dark"
		},
		{
			value: "Approved",
			color: "secondary"
		},
		{
			value: "Rejected",
			color: "info"
		}
	],
	projectTypes: [
		"Live Event",
		"Installation",
		"FL Recruitment",
		"Ops Staff",
		"Special Project",
		"Other"
	]
});

export default Constants;
