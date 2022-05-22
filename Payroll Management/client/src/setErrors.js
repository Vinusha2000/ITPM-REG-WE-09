export const setErrors = (EID,FullName,EmployeeType,BasicSalary,OT,Allowance,NetPay) =>{
    let errors = {};

    errors.EID = EID?"":"EID is required"
    errors.FullName = FullName?"":"FullName is required"
    errors.EmployeeType = EmployeeType?"":"Employee Type is required"
    errors.BasicSalary = BasicSalary?"":"Basci Salary is required"
    errors.OT = OT?"":"OT is required"
    errors.Allowance = Allowance?"":"Allowance is required"
    errors.NetPay = NetPay?"":"Net Pay is required"
    return errors;
}