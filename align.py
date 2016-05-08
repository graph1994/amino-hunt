import sys, json
# simple JSON echo script
global length
length = 0
def similarity(s1,s2,aligntype):
    s1Len = (len(s1))+1
    s2Len = (len(s2)) +1
    #print(s1Len)
    #print(s2Len)
    g = 0
    array = [[0 for x in range(s1Len)] for y in range(s2Len)]
    for x in range(s1Len):
        array[0][x] = x * aligntype

    for y in range(s2Len):
        #print(y)
        array[y][0] = y * aligntype


    for x in range(1,s1Len):
        for y in range(1,s2Len):
            if s1[x-1] == s2[y-1]: #and x != 0 or y != 0:5
                p = 1
            else:
                p = -1
            array[y][x] = max((array[y-1][x] + g),(array[y][x-1] + g),(array[y-1][x-1] + p))

    return(array)

def align(s1,s2):

    s2 = s2.strip()
    s1 = s1.strip()
    aligns = s1
    alignt= s2

    g = 0

    a = similarity(s1,s2,0)

    # for row in a:
    #      #Loop over columns.
    #
    #     for column in row:
    #         print(column, end="  ")
    #
    #     print(end="|\n\n")
    i = len(s1)
    j = len(s2)


    # align(n-2,m-2,n,m,aligns,alignt)
    while i > 0 and j > 0:
        if s1[i-1] == s2[j-1]:
            p = 1
        else:
            p = -1
        if j > 0 and a[j][i] == a[j-1][i] + g:
            j = j - 1
            aligns = aligns[:j] + '-' + aligns[j:]
            #print("up")
        elif i > 0 and j > 0 and a[j][i] == a[j-1][i-1] + p:
           # print("diag")
            j = j - 1
            i = i - 1
        else:
           # print("left")
            i = i - 1
            alignt = alignt[:i] + '-' + alignt[i:]
    return aligns,alignt,a

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
result = parse_fasta(sys.stdin
                )
s1 = result[0]["sequence"]
s2 = result[1]["sequence"]

s1,s2,array = align(s1,s2)
result[0]["align"] = s1
result[1]["align"] = s2
json_data = {}
json_data["matrix"] = array
result.append(json_data)
print result
