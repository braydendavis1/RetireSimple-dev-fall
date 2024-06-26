import {Box, Typography} from '@mui/material';
import React from 'react';
import SettingsNav from './SettingsNav';
  
export function EngineInfoPage() { 
	return (<div>
		<SettingsNav />
		<h1>Engine Info</h1>
		<Box sx={{paddingLeft: '2rem'}}>
			<Typography variant='h4' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Investments
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Stock
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- Capital raised by a business or corporation through the subscription of shares
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Bond
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- A bond is a fixed-income security that represents a loan made by an investor 
				to a borrower, typically a corporation or government entity, with a promise to 
				repay the principal amount along with periodic interest payments over a specified 
				time period
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Pension/Social Security
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- A pension is a financial arrangement in which an individual or employee 
				contributes money over their working years to fund retirement income, 
				typically provided as regular payments upon reaching retirement age.
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Guaranteed Benefits - guaranteed a specific monthly or yearly benefit once 
				they retire. The amount is usually fixed and not subject to market changes 
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Employer Responsibility - The employer is responsible for funding the plan 
				and ensuring that there are sufficient assets to meet the obligations
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Retirement Age and Service Requirements - The way benefits are determined take
				into account factors such as employee’s year of service and age at retirement
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Regular Payouts - After retirement,  you typically receive regular pension 
				payments, often in the form of a monthly annuity, which continues throughout their 
				retirement years 
			</Typography>
			<Typography variant='h4' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Vehicles
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				401k
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- A 401(k) is a tax-advantaged retirement savings plan typically 
				offered by employers in the United States, allowing employees to 
				contribute a portion of their pre-tax or post-tax income into 
				investment accounts, often with employer matching contributions, 
				to accumulate savings for retirement.
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				IRA
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- An Individual Retirement Account (IRA) is a tax-advantaged investment 
				account in the United States that individuals can use to save and 
				invest for retirement, with different types of IRAs offering varying 
				tax benefits and eligibility criteria.
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Tax Deductibility - Contributions to a Traditional IRA may be 
				tax-deductible in the year you make them
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Tax Deferred Growth - Earnings on investments within the Traditional IRA grow 
				tax-deferred. You won’t pay taxes on them until you withdraw the money in retirement
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Contribution Limits - there is a limit to how much you can contribute however 
				that varies
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				Roth IRA
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- A Roth IRA is a type of individual retirement account in the United States that 
				offers tax-free withdrawals in retirement, as contributions are made with after-tax 
				dollars and qualified withdrawals, including earnings, are not subject to income tax
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Tax Deductibility - Contributions to a Roth IRA are not tax-deductible. You 
				fund a Roth IRA with after-tax dollars
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Tax-Free Growth - Earnings on investments within the Roth IRA grow tax-free, 
				and qualified withdrawals in retirement are tax-free 
			</Typography>
			<Typography variant='body1' sx={{paddingLeft: 5, flexGrow: 1, marginBottom: '0.5rem'}}>
				■	  Contribution Limits - there is a limit to how much you can contribute however 
				that varies
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				403b
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- A 403(b) plan is a tax-advantaged retirement savings plan primarily offered to 
				employees of non-profit organizations and certain educational institutions, 
				allowing them to contribute pre-tax or post-tax income to save for retirement,
				with some similarities to a 401(k) plan.
			</Typography>
			<Typography variant='h6' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				457
			</Typography>
			<Typography variant='body1' sx={{flexGrow: 1, marginBottom: '0.5rem'}}>
				- A 457 plan is a tax-advantaged retirement savings plan available to employees of 
				state and local governments and some nonprofit organizations in the United States, 
				enabling them to contribute pre-tax income for retirement purposes, with certain 
				withdrawal restrictions.
			</Typography>
		</Box>
	</div>
	);
} 