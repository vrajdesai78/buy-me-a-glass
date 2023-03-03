use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("8McHBd1EVgVySm4GwZt6tkPMqmExGcQMGv8ge26B5Mo");

#[program]
mod UserDetails {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        ctx.accounts.new_account.data = data.clone();
        msg!("Changed data to: {}!", data); // Message will show up in the tx logs
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(init, payer = signer, space = 32 + 32)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    name: String,
    cid: String,
    key: Pubkey
}