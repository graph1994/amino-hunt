import sys, json
# simple JSON echo script

def parse_fasta(file):
    results = []
    fasta = {}
    sequence = ''
    for line in file:

        if '>' in line:
            if sequence:
                fasta['sequence'] = sequence
                results.append(fasta)
            sequence = ''
            fasta = {}
            name = line[1:].strip()
            fasta['Name'] = name
        else:
            sequence += line.strip()
    #strings = fasta.rstrip().split('>')
    fasta['sequence'] = sequence
    results.append(fasta)
    return results
print parse_fasta(sys.stdin)
