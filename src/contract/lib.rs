use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("7eYVtQu6nLuQ71TfteRaPQojza5wHmxYwkwJssHdKj9s");

#[program]
mod user_details {
    use super::*;
    pub fn create_user(ctx: Context<InitUser>, name: String, cid: String) -> Result<()> {
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        user_account.name = name;
        user_account.cid = cid;
        user_account.key = authority.key();

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct InitUser<'info> {
    #[account(
        init, 
        seeds = [b"user", name.as_bytes().as_ref()],
        bump, 
        payer = authority,
        space = 2344 + 8
    )]
    pub user_account: Account<'info, UserAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct UserAccount {
    name: String,
    cid: String,
    key: Pubkey,
}