# Exam Paper Text File Format Guide

## Overview
You can upload exam papers as `.txt` files instead of PDFs. Text files are easier to parse and will give more reliable results.

## File Location
Place your text files in the `exam_papers/` directory.

## Expected Format

### Basic Format
Each question should follow this format:

```
1. [Question text here]
A. [Option A text]
B. [Option B text]
C. [Option C text]
D. [Option D text]

2. [Next question text]
A. [Option A text]
B. [Option B text]
C. [Option C text]
D. [Option D text]
```

### Important Rules

1. **Question Numbers**: Use format `1.` or `1)` followed by a space
2. **Options**: Use format `A.` or `A)` followed by a space
3. **Blank Lines**: Leave a blank line between questions (optional but recommended)
4. **No Extra Text**: Avoid headers, footers, or page numbers between questions

### Answer Key Format

At the end of the file, include an answer key section:

```
ANSWERS AND LEARNING OUTCOMES

1 A 1.1
2 B 1.2
3 C 1.3
...
```

Or:

```
Specimen Examination Answers

1 A 1.1
2 B 1.2
3 C,D 1.3
...
```

### Example

```
1. In negligence, what standard of care would be required of a newly-qualified electrician?
A. The standard for the electrical profession only.
B. The standard for the electrical profession but with an allowance for level of experience.
C. The standard of a prudent man.
D. The standard of a reasonable man.

2. One of the requirements for a claimant to succeed in an action for trespass to the person is
A. intention.
B. negligence.
C. prescription.
D. recklessness.

3. What is the common law remedy for the tort of nuisance?
A. Exemplary damages.
B. General damages.
C. An injunction.
D. Restitution.

ANSWERS AND LEARNING OUTCOMES

1 A 1.1
2 A 1.2
3 C 1.3
```

## Tips

1. **Clean Formatting**: Keep formatting simple and consistent
2. **No Page Breaks**: Remove page numbers and headers/footers
3. **Consistent Spacing**: Use consistent spacing between questions
4. **Complete Options**: Make sure all options (A-D or A-E) are present for each question
5. **Answer Key**: Always include an answer key at the end

## File Naming

Name your files descriptively, e.g.:
- `M05 Exam - 2021.txt`
- `M05 Exam - 2022.txt`
- `M05 Exam - 2023.txt`

The year will be automatically extracted from the filename.

## Benefits Over PDFs

- ✅ More reliable parsing
- ✅ No page break issues
- ✅ No header/footer artifacts
- ✅ Cleaner question boundaries
- ✅ Easier to edit and maintain

