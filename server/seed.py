from faker import Faker
from models import db, User, Group, GroupMember, Loan, Repayment, Transaction, Savings
from werkzeug.security import generate_password_hash
import random
from datetime import timedelta
from app import app  # import your Flask app instance

fake = Faker()

def seed_users(n=20):
    roles = ['member', 'admin']
    users = []

    for _ in range(n):
        user = User(
            name=fake.name(),
            email=fake.unique.email(),
            phone_number=fake.unique.phone_number(),
            password_hash=generate_password_hash('password123'),
            role=random.choice(roles)
        )
        db.session.add(user)
        users.append(user)

    db.session.commit()
    print(f"Seeded {n} users.")
    return users

def seed_groups(n=10, users=None):
    if not users:
        print("Users required to create groups.")
        return []

    groups = []
    for _ in range(n):
        group = Group(
            name=fake.unique.company(),
            signatory_count=random.randint(2, 5),
            interest_rate=round(random.uniform(1.0, 10.0), 2),
            creator_id=random.choice(users).id
        )
        db.session.add(group)
        groups.append(group)

    db.session.commit()
    print(f"Seeded {n} groups.")
    return groups

def seed_group_members(n=50, users=None, groups=None):
    if not users or not groups:
        print("Users and Groups are required for group memberships.")
        return []

    memberships = []
    attempts = 0
    while len(memberships) < n and attempts < n * 10:  # limit tries to avoid infinite loop
        attempts += 1
        user = random.choice(users)
        group = random.choice(groups)

        # Avoid duplicates
        existing = GroupMember.query.filter_by(user_id=user.id, group_id=group.id).first()
        if existing:
            continue

        membership = GroupMember(
            user_id=user.id,
            group_id=group.id,
            role=random.choice(['member', 'admin', 'moderator']),
            is_signatory=random.choice([True, False]),
            joined_at=fake.date_time_this_decade()
        )
        db.session.add(membership)
        memberships.append(membership)

    db.session.commit()
    print(f"Seeded {len(memberships)} group members.")
    return memberships

def seed_loans(n=30, memberships=None):
    if not memberships:
        print("Group memberships required to seed loans.")
        return []

    loans = []
    for _ in range(n):
        membership = random.choice(memberships)
        user_id = membership.user_id
        group_id = membership.group_id

        amount = round(random.uniform(100.0, 5000.0), 2)
        interest_rate = round(random.uniform(2.0, 15.0), 2)
        issued_date = fake.date_time_this_year()
        due_date = issued_date + timedelta(days=random.randint(30, 180))
        status = random.choice(['pending', 'approved', 'rejected', 'repaid'])
        repaid = status == 'repaid'

        loan = Loan(
            user_id=user_id,
            group_id=group_id,
            amount=amount,
            interest_rate=interest_rate,
            issued_date=issued_date,
            due_date=due_date,
            status=status,
            repaid=repaid
        )
        db.session.add(loan)
        loans.append(loan)

    db.session.commit()
    print(f"Seeded {len(loans)} loans.")
    return loans

def split_amount_randomly(total, parts):
    weights = [random.random() for _ in range(parts)]
    total_weight = sum(weights)
    return [total * (w / total_weight) for w in weights]

def seed_repayments(loans=None):
    if not loans:
        print("Loans required for repayments.")
        return []

    repayments = []
    for loan in loans:
        if loan.status not in ['approved', 'repaid']:
            continue
        if loan.repayments:
            continue

        num_payments = random.randint(1, 5)
        total_paid = loan.amount * (1 + loan.interest_rate / 100)
        amounts = split_amount_randomly(total_paid, num_payments)

        date = loan.issued_date or fake.date_time_this_year()

        for amt in amounts:
            date += timedelta(days=random.randint(7, 30))

            repayment = Repayment(
                amount=round(amt, 2),
                date=date,
                loan_id=loan.id,
                user_id=loan.user_id
            )
            db.session.add(repayment)
            repayments.append(repayment)

    db.session.commit()
    print(f"Seeded {len(repayments)} repayments.")
    return repayments

def seed_savings(n=50, memberships=None):
    if not memberships:
        print("Group memberships required for savings.")
        return []

    savings_list = []
    for _ in range(n):
        membership = random.choice(memberships)
        savings = Savings(
            user_id=membership.user_id,
            group_id=membership.group_id,
            amount=round(random.uniform(10.0, 1000.0), 2),
            date=fake.date_time_this_year(),
            is_dividend_eligible=random.choice([True, True, False])
        )
        db.session.add(savings)
        savings_list.append(savings)

    db.session.commit()
    print(f"Seeded {len(savings_list)} savings.")
    return savings_list

def seed_transactions(n=50, memberships=None):
    if not memberships:
        print("Group memberships required for transactions.")
        return []

    TRANSACTION_TYPES = ['deposit', 'withdrawal', 'repayment', 'fee', 'dividend']
    transactions = []

    for _ in range(n):
        membership = random.choice(memberships)
        user_id = membership.user_id
        group_id = membership.group_id if random.random() > 0.2 else None

        txn_type = random.choice(TRANSACTION_TYPES)
        amount = round(random.uniform(5.0, 1000.0), 2)

        txn = Transaction(
            user_id=user_id,
            group_id=group_id,
            amount=amount,
            type=txn_type,
            timestamp=fake.date_time_this_year(),
            description=f"{txn_type.capitalize()} of ${amount:.2f}"
        )
        db.session.add(txn)
        transactions.append(txn)

    db.session.commit()
    print(f"Seeded {len(transactions)} transactions.")
    return transactions

def run_all_seeds():
    print("Seeding users...")
    users = seed_users(30)

    print("Seeding groups...")
    groups = seed_groups(15, users)

    print("Seeding group members...")
    memberships = seed_group_members(60, users, groups)

    print("Seeding loans...")
    loans = seed_loans(40, memberships)

    print("Seeding repayments...")
    seed_repayments(loans)

    print("Seeding savings...")
    seed_savings(70, memberships)

    print("Seeding transactions...")
    seed_transactions(80, memberships)

    print("All seeding completed!")

if __name__ == "__main__":
    with app.app_context():
        run_all_seeds()
