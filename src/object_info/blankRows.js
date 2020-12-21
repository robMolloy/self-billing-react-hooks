export const contactBlankRow = {
  id: "",
  con_cus_id: "",
  con_type: "",
  con_method: "",
  con_address: "",
};

export const customerBlankRow = {
  id: "",
  cus_first_name: "",
  cus_last_name: "",
};

export const projectBlankRow = {
  prj_id: "",
  prj_usr_id: "",
  prj_default_qty: "",
  prj_default_unit: "",
  prj_default_work: "",
  prj_rate_per_default_unit: "",
  prj_default_repeat_every_qty: "",
  prj_default_repeat_every_unit: "",
  prj_acronym: "",
  prj_address_1: "",
  prj_address_2: "",
  prj_city: "",
  prj_postcode: "",
  prj_cus_id: "",
  prj_default_duration_unit: "",
  prj_default_duration_qty: "",
  prj_default_cost_per_duration_unit: "",
};

export const prjCusLinkBlankRow = {
  prj_cus_link_usr_id: "",
  prj_cus_link_prj_id: "",
  prj_cus_link_cus_id: "",
};

export const recItemBlankRow = {
  rci_id: "",
  rci_usr_id: "",
  rci_rec_id: "",
  rci_work: "",
  rci_unit: "",
  rci_qty: "",
  rci_cost_per_unit: "",
  rci_total: "",
};

export const recordBlankRow = {
  rec_id: "",
  rec_usr_id: "",
  rec_prj_id: "",
  rec_description: "",
  rec_timestamp_planned_start: "",
  rec_timestamp_planned_finish: "",
  rec_timestamp_completed: "",
  rec_timestamp_paid: "",
  rec_total: "",
  rec_duration_qty: "",
  rec_duration_unit: "",
};

// projects:{
//   keys:{primary:'prj_id',temp_id:'prj_temp_id',user:'prj_usr_id'},
//   blank:{prj_id:'',prj_usr_id:'',prj_default_qty:'',prj_default_unit:'',prj_default_work:'',prj_rate_per_default_unit:'',prj_default_repeat_every_qty:'',prj_default_repeat_every_unit:'',prj_acronym:'',prj_address_1:'',prj_address_2:'',prj_city:'',prj_postcode:'',prj_primary_cus_id:'',prj_default_duration_unit:'',prj_default_duration_qty:'',prj_default_cost_per_duration_unit:''},
//   labels:{prj_id:'Id',prj_temp_id:'Temp Id',prj_usr_id:'User Id',prj_default_qty:'Quantity',prj_default_work:'Work',prj_default_unit:'Unit',prj_rate_per_default_unit:'Rate Per Unit',prj_default_repeat_every_qty:'',prj_default_repeat_every_unit:'Length Of Time',prj_acronym:'Reference',prj_address_1:'Address 1',prj_address_2:'Address 2',prj_city:'City',prj_postcode:'Postcode',prj_primary_cus_id:'Primary Customer Id',prj_default_duration_unit:'Duration Unit',prj_default_duration_qty:'',prj_default_cost_per_duration_unit:'Cost Per Duration Unit'}
// },
// customers:{
//   keys:{primary:'cus_id',temp:'cus_temp_id',user:'cus_usr_id'},
//   blank:{cus_id:'',cus_usr_id:'',cus_first_name:'',cus_last_name:'',cus_primary_con_id:''},
//   labels:{cus_id:'Id',cus_temp_id:'Temp Id',cus_usr_id:'User Id',cus_first_name:'First Name',cus_last_name:'Last Name',cus_primary_con_id:'Primary Contact Id'}
// },
// prj_cus_links:{
//   keys:{primary:'prj_cus_link_id',temp:'prj_cus_link_temp_id',user:'prj_cus_link_usr_id'},
//   blank:{prj_cus_link_id:'',prj_cus_link_usr_id:'',prj_cus_link_prj_id:'',prj_cus_link_cus_id:''},
//   labels:{prj_cus_link_id:'cus_link_id',prj_cus_link_temp_id:'Temp Id',prj_cus_link_usr_id:'prj_cus_link_usr_id',prj_cus_link_prj_id:'prj_cus_link_prj_id',prj_cus_link_cus_id:'prj_cus_link_cus_id'}
// },
// contacts:{
//   keys:{primary:'con_id',temp:'con_temp_id',user:'con_usr_id'},
//   blank:{con_id:'',con_usr_id:'',con_cus_id:'',con_type:'',con_method:'',con_address:''},
//   labels:{con_id:'Id',con_temp_id:'Temp Id',con_usr_id:'User Id',con_cus_id:'Customer Id',con_type:'type',con_method:'method',con_address:'Address'}
// },
// records:{
//   keys:{primary:'rec_id',temp:'rec_temp_id',user:'rec_usr_id'},
//   blank:{rec_id:'',rec_usr_id:'',rec_prj_id:'',rec_description:'',rec_timestamp_planned_start:'',rec_timestamp_planned_finish:'',rec_timestamp_completed:'',rec_timestamp_paid:'',rec_total:'',rec_duration_qty:'',rec_duration_unit:'',},
//   labels:{rec_id:'Id',rec_temp_id:'Temp Id',rec_usr_id:'User Id',rec_prj_id:'Project Id',rec_description:'Description',rec_timestamp_planned_start:'Planned Start',rec_timestamp_planned_finish:'Planned Finish',rec_timestamp_completed:'Time Completed',rec_timestamp_paid:'Time Paid',rec_total:'Total',rec_duration_qty:'Duration',rec_duration_unit:'Duration Quantity'}
// },
// rec_items:{
//   keys:{primary:'rci_id',temp:'rci_temp_id',user:'rci_usr_id'},
//   blank:{rci_id:'',rci_usr_id:'',rci_rec_id:'',rci_work:'',rci_unit:'',rci_qty:'',rci_cost_per_unit:'',rci_total:''},
//   labels:{rci_id:'Id',rci_temp_id:'Id',rci_usr_id:'User Id',rci_rec_id:'Record Id',rci_work:'Type Of Work',rci_unit:'Unit',rci_qty:'Quantity',rci_cost_per_unit:'Cost per Unit',rci_total:'Total'}
// }
