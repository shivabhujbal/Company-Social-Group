package com.excelr.request;

import java.util.List;

public class AddEmployeesRequest {

	    private int group_id;
	    private List<Integer> employee_ids;
	   

	    public int getGroup_id() {
	        return group_id;
	    }

	    public void setGroup_id(int group_id) {
	        this.group_id = group_id;
	    }

	    public List<Integer> getEmployee_ids() {
	        return employee_ids;
	    }

	    public void setEmployee_ids(List<Integer> employee_ids) {
	        this.employee_ids = employee_ids;
	    }
	

}
