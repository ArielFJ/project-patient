'''
    Read all files inside src/ folder
    Change extension of .js to .tsx
'''
import os

currentDir = os.getcwd()
srcPath = os.path.join(currentDir, 'src')

def scanDirs(path):
    with os.scandir(path) as entries:
        for entry in entries:
            if entry.is_dir():
                dirPath = os.path.join(path, entry.name)
                scanDirs(dirPath)
            else:
                fileTuple = os.path.splitext(entry.name)
                extension = fileTuple[1]
                if extension == '.js':
                    oldName = os.path.join(path, entry.name)
                    newName = os.path.join(path, fileTuple[0] + '.tsx')
                    os.rename(oldName, newName)
                    
scanDirs(srcPath)