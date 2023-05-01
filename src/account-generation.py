## Account generation program from the csv file with the account information in 

import csv
import random


with open('accounts.csv') as accounts_file:
    accounts_reader = csv.reader(accounts_file, delimiter=",")
    lines = 0
    for row in accounts_reader:
        if lines == 0:
            print(f'Column names are {", ".join(row)}')
            lines += 1
        else:
            random_score = random.randint(0,100)
            print("{",end="")
            print(f'"username":"{row[0]}",\n"score":0',end="")
            print("},")
            lines += 1


# Animal, Icon URL, Display Name, Group, Password, Initial Test Score, Final Test Score
#    0       1          2          3        4            5                     6